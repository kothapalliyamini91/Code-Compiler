import logging
from .models import Online
from .serializers import OnlineSerializer
from rest_framework.status import HTTP_201_CREATED
from rest_framework.response import Response
from rest_framework.views import APIView

log = logging.getLogger(__name__)

class Useradd(APIView):
    def post(self, request):
        try:
            my_dict = request.data
            print(request.data)
            
            user_info = Online()
            user_info.user_id = my_dict['userId']
            user_info.source_code = my_dict['sourceCode']
            user_info.language_name = my_dict['language']
            user_info.input = my_dict['input']
            user_info.output = my_dict['output']
            user_info.status = my_dict['executionStatus']
            user_info.time = my_dict['executionTime']
            user_info.error = my_dict['error_']
            user_info.question_id = my_dict['questionNumber']
            user_info.questionDescription = my_dict['questionDescription']
            
            user_info.save()
            
            return Response(True, status=HTTP_201_CREATED)
        
        except Exception as e:
            log.exception(e)
            return Response(False)  # Return an appropriate error response
 