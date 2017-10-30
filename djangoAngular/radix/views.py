from django.shortcuts import render
from django.http import JsonResponse
from radix.models import Data, Type

# Create your views here.

# **********************************************************************************************************************
# Pagina de INICIO, donde se muestra cada variable en tiempo real junto con valores estadisticos
def index(request):
    return render(request, 'radix/index.html')
# **********************************************************************************************************************

def sensor(request):
    return render(request, 'radix/sensor.html')



# Devuelve los ultimos n valores de una variable
def last_data(request, typeId = 1, n = 1):
    # Filtrando los ultimos resultados (poner '-date_time' provoca orden descendente)
    if n == 0:
        results = [ob.as_chart() for ob in Data.objects.filter(type_id=typeId).order_by('-date_time')]
    else:
        results = [ob.as_chart() for ob in Data.objects.filter(type_id=typeId).order_by('date_time')[Data.objects.filter(type_id=typeId).count()-int(n):]]
    
    return JsonResponse({'success': True, 'results': results})


# class PartialGroupView(TemplateView):
#     def get_context_data(self, **kwargs):
#         context = super(PartialGroupView, self).get_context_data(**kwargs)
#         # update the context
#         return context
