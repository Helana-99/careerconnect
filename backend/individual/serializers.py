from rest_framework import serializers
from .models import Individual, Experience
from authentication.serializers import UserSerializer

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'job_title', 'company', 'duration', 'description']

class IndividualSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)  # Optional user data
    experiences = ExperienceSerializer(many=True, required=False)  # Optional experiences

    class Meta:
        model = Individual
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user', None)  # Extract user data
        experiences_data = validated_data.pop('experiences', [])  # Extract experiences

        # Handle user creation if provided
        if user_data:
            user_serializer = UserSerializer(data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()
        else:
            user = None

        # Create individual
        individual = Individual.objects.create(user=user, **validated_data)

        # Handle experience creation if provided
        for experience_data in experiences_data:
            Experience.objects.create(profile=individual, **experience_data)

        return individual

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)  # Extract user data
        experiences_data = validated_data.pop('experiences', None)  # Extract experiences

        # Update user if data is provided
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        # Update the individual fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle experience update or creation if provided
        if experiences_data is not None:
            # Optionally remove old experiences (you could adjust this logic)
            instance.experiences.all().delete()

            # Create new experiences
            for experience_data in experiences_data:
                Experience.objects.create(profile=instance, **experience_data)

        return instance