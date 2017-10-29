FROM python:3.5.0

ENV PYTHONUNBUFFERED=1 \
    PYTHONPATH=/back

COPY ./back /back/
WORKDIR /back

RUN pip3 install -r /back/requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]