from django.http import JsonResponse
from backend.utils import api_response
import logging

logger = logging.getLogger(__name__)

class AllowOnlyGetMiddleware:
    """
    Middleware to ensure valid GET requests and handle 404 errors
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Check if the request method is GET and contains a body
        if request.method == 'GET' and request.body:
            return api_response(data=None, success=False, status=400, message='GET request should not contain a body')

        # Check if the request method is not GET and the path starts with /api/
        if request.method != 'GET' and request.path.startswith('/api/'):
            return api_response(data=None, success=False, status=405, message='Method Not Allowed.')

        # Handle 404 errors
        if response.status_code == 404:
            return api_response(data=None, success=False, status=404, message='The requested resource was not found on this server.')

        return response
