from django.shortcuts import render, redirect
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Company
from .serializers import CompanySerializer
from authentication.models import User
from django.http import JsonResponse
from django.db.models import Q
from django.conf import settings
from django.db.models import Avg
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Company
from .serializers import CompanySerializer
from django.shortcuts import get_object_or_404



def send_activation_email(user, request):
    subject = "CareerConnect Account Activation"
    uid = urlsafe_base64_encode(force_bytes(user.user.pk))
    activation_link = request.build_absolute_uri(reverse('activate-company', kwargs={'uidb64': uid}))
    message = f"Hello {user.user.username}, please click the link to activate your account: {activation_link}"

    send_mail(
        subject,
        message,
        'CareerConnect <safa.suli.2@gmail.com>',
        [user.user.email],
        fail_silently=False,
    )

def activate(request, uidb64):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        user.is_active = True
        user.save()
        messages.success(request, 'Your account has been successfully activated!')
        return redirect('http://localhost:3000/login')
    except User.DoesNotExist:
        messages.error(request, 'Invalid activation link')
        return redirect('http://localhost:3000/register/company')


class CompanyRegistrationView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_activation_email(user, request)
            messages.success(request, f'Dear {user.user.username}, please go to your email inbox and click on the received activation link to confirm and complete the registration. Check your spam folder if necessary.')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Only allow logged-in users
def get_logged_in_company_profile(request):
    try:
        # Get the logged-in user's company
        company = get_object_or_404(Company, user=request.user)

        # Same job query and data formatting
        jobs = company.job_set.all()
        job_data = [{'id': job.id, 'title': job.title, 'location': job.location} for job in jobs]

        # Return company profile data
        data = {
            'id': company.id,
            'user': {
                'username': company.user.username,
                'email': company.user.email,
            },
            'logo': company.logo.url if company.logo else None,
            'bio': company.bio,
            'industry': company.industry,
            'registration_id': company.registration_id,
            'phone_number': company.phone_number,
            'location': company.location,
            'client_base': company.client_base,
            'website': company.website,
            'company_size': company.company_size,
            'founded': company.founded,
            'linkedin': company.linkedin,
            'twitter': company.twitter,
            'jobs': job_data,
        }
        return Response(data, status=status.HTTP_200_OK)
    except Company.DoesNotExist:
        return Response({'error': 'Company not found'}, status=status.HTTP_404_NOT_FOUND)





@api_view(['GET'])
@permission_classes([AllowAny])  # Allow public access to view any company's profile
def get_company_profile(request, username):
    try:
        # Fetch company by ID
        company = get_object_or_404(Company, user__username=username)
        
        # Get all jobs related to this company
        jobs = company.job_set.all()
        job_data = [{'id': job.id, 'title': job.title, 'location': job.location} for job in jobs]

        # Prepare data for response
        data = {
            'id': company.id,
            'user': {
                'username': company.user.username,
                'email': company.user.email,
            },
            'logo': company.logo.url if company.logo else None,
            'bio': company.bio,
            'industry': company.industry,
            'registration_id': company.registration_id,
            'phone_number': company.phone_number,
            'location': company.location,
            'client_base': company.client_base,
            'website': company.website,
            'company_size': company.company_size,
            'founded': company.founded,
            'linkedin': company.linkedin,
            'twitter': company.twitter,
            'jobs': job_data,
        }
        return Response(data, status=status.HTTP_200_OK)
    except Company.DoesNotExist:
        return Response({'error': 'Company not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([AllowAny])
def search_company(request):
    company_name = request.query_params.get('company_name', None)
    location = request.query_params.get('location', None)
    industry = request.query_params.get('industry', None)
    company_size = request.query_params.get('company_size', None)
    client_base = request.query_params.get('client_base', None)
    founded_after = request.query_params.get('founded_after', None)
    employees_min = request.query_params.get('employees_min', None)

    companies = Company.objects.all()

    # Filtering by company name (based on the User's username)
    if company_name:
        companies = companies.filter(user_username_icontains=company_name)

    # Filtering by location
    if location:
        companies = companies.filter(location__icontains=location)

    # Filtering by industry
    if industry:
        companies = companies.filter(industry__icontains=industry)

    # Filtering by company size
    if company_size:
        companies = companies.filter(company_size__iexact=company_size)

    # Filtering by client base
    if client_base is not None:  # Ensuring that client_base is checked for both True/False
        companies = companies.filter(client_base=client_base.lower() == 'true')

    # Filtering by founded date (companies founded after a certain year)
    if founded_after:
        companies = companies.filter(founded__gte=founded_after)

    # Filtering by minimum number of employees
    if employees_min:
        companies = companies.filter(employees__gte=int(employees_min))

    # Retrieve the first matching company or return a 404 if no match is found
    company = companies.first()

    if company:
        # Serialize the single company
        serializer = CompanySerializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "No matching company found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])  # Allow unauthenticated access for GET requests
def list_company(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_company(request):
    try:
        company = request.user.company

        # Pass only the fields that belong to the Company model
        serializer = CompanySerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Company.DoesNotExist:
        return Response({'error': 'Company profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def company_delete(request):
    try:
        company = request.user.company
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Ensure that the user is the owner of the profile
    if company.user != request.user:
        return Response({'detail': 'You do not have permission to delete this profile.'},
                        status=status.HTTP_403_FORBIDDEN)

    company.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)