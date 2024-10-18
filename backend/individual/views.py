from django.shortcuts import render, redirect
from rest_framework import viewsets, status,permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
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
from .models import Individual
from .serializers import *
from .models import *
from authentication.models import User
from django.http import JsonResponse
from django.db.models import Q
from django.conf import settings
from django.db.models import Avg
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def send_activation_email(user, request):
    subject = "CareerConnect Account Activation"
    uid = urlsafe_base64_encode(force_bytes(user.user.pk)) 
    print("uid",uid)
    activation_link = request.build_absolute_uri(reverse('activate-individual', kwargs={'uidb64': uid}))
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
        print(request)
        messages.error(request, 'Invalid activation link')
        return redirect('http://localhost:3000/register/client')


class IndividualRegistrationView(APIView):
    def post(self, request):
        serializer = IndividualSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            send_activation_email(user, request)
            messages.success(request, f'Dear {user.user.username}, please go to your email inbox and click on the received activation link to confirm and complete the registration. Check your spam folder if necessary.')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def author_profile(request, id):
#     try:
#         individual = Individual.objects.get(pk=id)
#         serializer = IndividualSerializer(individual)
#         return Response(serializer.data)
#     except Individual.DoesNotExist:
#         return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


# @api_view(['GET'])
# def user_profile(request, id=None):
#     # If an ID is provided, fetch the profile for the specified user
#     if id:
#         try:
#             individual = Individual.objects.get(pk=id)
#             serializer = IndividualSerializer(individual)
#             return Response(serializer.data)
#         except Individual.DoesNotExist:
#             return Response({"error": "Profile not found"}, status=404)

#     # Otherwise, return the profile of the logged-in user
#     if request.user.is_authenticated:
#         try:
#             individual = Individual.objects.get(user=request.user)
#             serializer = IndividualSerializer(individual)
#             return Response(serializer.data)
#         except Individual.DoesNotExist:
#             return Response({"error": "Profile not found"}, status=404)

#     return Response({"error": "Unauthorized"}, status=401)


@api_view(['GET'])
def user_profile(request, id=None):
    try:
        individual = Individual.objects.get(user__id=id)
        serializer = IndividualSerializer(individual)
        return Response(serializer.data)
    except Individual.DoesNotExist:
        print(f"Profile not found for user ID: {id}")
        return Response({"error": "Profile not found"}, status=404)


@api_view(['GET'])
def search_individual(request):
    username = request.query_params.get('username', None)
    specialization = request.query_params.get('specialization', None)

    individuals = Individual.objects.all()

    if username:
        # Filter by username
        individuals = individuals.filter(user_username_icontains=username)

    if specialization:
        # Filter by specialization
        individuals = individuals.filter(specialization__icontains=specialization)

    serializer = IndividualSerializer(individuals, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Get all individual :
@api_view(['GET'])
@permission_classes([AllowAny])  # Allow unauthenticated access for GET requests
def list_individual(request):
    if request.method == 'GET':
        individuals = Individual.objects.all()
        serializer = IndividualSerializer(individuals, many=True)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def individual_update(request):
    try:
        # Fetch the profile for the logged-in user
        individual = Individual.objects.get(user=request.user)
        
        # Update experience data if provided
        experience_data = request.data.get('experience', [])  # This should be a list of experiences

        # Assuming experience_data is a list of dictionaries
        for experience in experience_data:
            job_title = experience.get('job_title', 'Job Title')
            company = experience.get('company', 'Company')
            duration = experience.get('duration', 'Duration')
            description = experience.get('description', 'Description')

            # Here you can update or process each experience as needed
            # For instance, you might update the related models or fields in the Individual model

        # Update the individual instance with other provided data (if any)
        serializer = IndividualSerializer(individual, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)

    except Individual.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def individual_delete(request, id):
    try:
        individual = Individual.objects.get(pk=id)
    except Individual.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Ensure that the user is the owner of the profile
    if individual.user != request.user:
        return Response({'detail': 'You do not have permission to delete this profile.'}, status=status.HTTP_403_FORBIDDEN)

    individual.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)