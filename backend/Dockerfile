FROM python:3.11.7

# Set environment variable to ensure output is shown in the console
ENV PYTHONUNBUFFERED=1

#  set contaner working directory to /code
WORKDIR /code

COPY backend/requirements.txt /code/

# Install dependencies
RUN pip install -r requirements.txt

# Copy backend code files
COPY backend/ /code/backend/
COPY manage.py /code/
COPY Pipfile /code/
COPY Pipfile.lock /code/
COPY db.sqlite3 /code/

# Expose 8000 to the host
EXPOSE 8000

# Run the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
