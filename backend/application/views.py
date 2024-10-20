from .models import Proposal
from .serializers import ProposalSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response

class ProposalPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 200

class ProposalCreateView(generics.CreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

class ProposalListView(generics.ListAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ProposalPagination

    def get_queryset(self):
        user = self.request.user
        individual = getattr(user, 'individual', None)
        company = getattr(user, 'company', None)

        if individual:
            return Proposal.objects.filter(individual=individual)
        elif company:
            return Proposal.objects.filter(company=company)
        return Proposal.objects.none()

class ProposalCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        individual_id = request.data.get('individual')
        job_id = request.data.get('job')

        exists = Proposal.objects.filter(individual_id=individual_id, job_id=job_id).exists()
        return Response({'exists': exists})
