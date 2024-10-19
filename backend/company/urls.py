from django.urls import path
from .views import *

urlpatterns = [
    path('register/', CompanyRegistrationView.as_view(), name='company-registration'),  # Company registration
    path('activate/<uidb64>/', activate, name='activate-company'),  # Company activation via email
    path('search/', search_company, name='company-search'),  # Search companies
    path('list/', list_company, name='company-list'),  # List all companies
    path('update/', update_company, name='company-update'),  # Update company profile
    path('delete/', company_delete, name='company-delete'),  # Delete company profile

    # Fetch the logged-in user's company profile
    path('loggedin-profile/', get_logged_in_company_profile, name='loggedin-company-profile'),

    # Fetch any company's profile by ID
    path('authorprofile/<str:username>', get_company_profile, name='authorcompany-profile'),  
]
