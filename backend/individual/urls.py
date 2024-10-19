from django.urls import path
from .views import *

urlpatterns = [
    path('register/', IndividualRegistrationView.as_view(), name='individual-registration'),  # Added parentheses here
    path('activate/<uidb64>/', activate, name='activate-individual'),  # Ensure this matches with the send_activation_email
    path('search/', search_individual, name='individual-search'),
    path('list/', list_individual, name='individual-list'),
    path('update/', individual_update, name='individual-update'),
    path('delete/', individual_delete, name='individual-delete'),
    
    # path('profile/', user_profile, name='user-profile'),
    path('profile/<int:id>/', user_profile, name='view-user-profile'),  # For viewing other users' profiles
    ]