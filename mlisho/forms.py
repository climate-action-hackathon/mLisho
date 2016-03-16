from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from mlisho.models import * #Pastoralist, Livestock, DMI
from markets.models import *
from landcover.models import *

def upload_application(instance, filename):
   # return "title_images/%s" % (filename)
    return '/'.join(['application_docs', str(instance.category), filename])
country = (
    ('Kenya','Kenya'),
    ('Tanzania','Tanzania'),
    ('Mali','Mali'),
    ('Botswana','Botswana'),

    )
county = (
    ('Narok','Narok'),
    ('Bomet','Bomet'),
    ('Machakos','Machakos'),
    ('Garissa','Garissa'),

    )
incidence_status = (
        ('Drought','Drought'),
        ('Floods','Floods'),
    )

user_type = (
        ('Nomad','Nomad'),
        ('Agent', (
            ('Market', 'Market'),
            ('Insurance', 'Insurance'),
        )
    ),

    )

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    user_type = forms.MultipleChoiceField(required=False,
        widget=forms.CheckboxSelectMultiple,
        choices=user_type)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('activation_key',)

class PastoralistForm(forms.ModelForm):
    class Meta:
        model = Pastoralist
        exclude = ['app_id','user','email','date_applied','province','district', 'description']

class MarketForm(forms.Form):
    market_name = models.CharField(max_length=50)
    livestock = models.EmailField(max_length=50, help_text='user@user.com')
    price_livestock = models.CharField(max_length=50, help_text="Kshs.")
    price_kg = models.CharField(max_length=50, help_text="Kshs.")
    premium = models.CharField(max_length=50, help_text="Kshs.")
    compensation = models.CharField(max_length=50, help_text="Kshs.")
    country = models.CharField(max_length=50, choices=country)
    county = models.CharField(max_length=50, choices=county, default=county[0][0])
    town = models.CharField(max_length=50, null=True, help_text= 'Enkara')
    status = models.CharField(max_length=15, null=False, choices=incidence_status, default=incidence_status[0][0])
    date_applied = models.DateTimeField(auto_now_add=True)
    geom=forms.CharField(max_length=200, required=True)

    def clean(self):

        cleaned_data = self.cleaned_data

        market_name = cleaned_data.get("owner")
        livestock = cleaned_data.get("price")
        price_livestock = cleaned_data.get("email")
        price_kg = cleaned_data.get("telephone")
        premium = cleaned_data.get("incidence_title")
        country = cleaned_data.get("country")
        county = cleaned_data.get("county")
        town = cleaned_data.get("town")
        status = cleaned_data.get("status")
        geom = cleaned_data.get("geom")
    

        return cleaned_data

    
class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': 'E-mail address'}))
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password1', 'password2')
    #clean email field
    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            User._default_manager.get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError('duplicate email')

    #modify save() method so that we can set user.is_active to False when we first create our user
    def save(self, commit=True):        
        user = super(RegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.is_active = False # not active until he opens activation link
            user.save()

        return user

        