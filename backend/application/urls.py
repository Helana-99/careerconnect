from django.urls import path
from .views import *

urlpatterns = [
    path('list/', ProposalListView.as_view(), name='proposal-list'),
    path('create/', ProposalCreateView.as_view(), name='proposal-create'),
    path('check/', ProposalCheckView.as_view(), name='proposal-check'),  # Checks if a proposal already exists for a given individual and job.  # Added parentheses here.  # Ensure this matches with the send_activation_email
]
