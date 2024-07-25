import logging
from django.http import JsonResponse

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

def api_response(data=None, success=True, status=200, message=''):
    """
    Utility function to create a consistent API response.
    """
    response = {
        'data': data,
        'success': success,
        'status': status,
        'message': message,
    }
    return JsonResponse(response, status=status)

def read_csv(file_name):
    """
    Reads data from a CSV file and returns it as a list of dictionaries.
    Logs an error if the file is not found.
    """
    import csv
    import os
    from django.conf import settings

    file_path = os.path.join(settings.BASE_DIR, 'data', file_name)
    data = []
    try:
        with open(file_path, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                data.append(row)
        return data
    except FileNotFoundError:
        logger.error(f"CSV file {file_name} not found at path {file_path}")
        return None
    except Exception as e:
        logger.error(f"An error occurred while reading {file_name}: {e}")
        return None
