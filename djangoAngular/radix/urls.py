
# from django.conf.urls import patterns, url
from django.conf.urls import include, url
from . import views

# partial_patterns = patterns('',
#     url(r'^contact.html$', PartialGroupView.as_view(template_name='contact.html'), name='contact'),
# )

# urlpatterns = patterns('',
#     # Para acceder al index de nuestros sensores
#     url(r'^$', views.index, name='index'),
#     # views.index es para la funcion del controlador (view) y
#     # name='index' para referenciar la URL desde la vista (template)
    
#     # url(r'^partials/', include(partial_patterns, namespace='partials')),

#     url(r'^last_data/(?P<n>\d+)/(?P<typeId>\d+)$', views.last_data, name='last_data'),    

# )

urlpatterns = [
    # Para acceder al index de nuestros sensores
    url(r'^$', views.index, name='index'),
    url(r'^sensor', views.sensor, name='sensor'),
    # views.index es para la funcion del controlador (view) y
    # name='index' para referenciar la URL desde la vista (template)
    
    # url(r'^partials/', include(partial_patterns, namespace='partials')),

    url(r'^last_data/(?P<typeId>\d+)/(?P<n>\d+)$', views.last_data, name='last_data')
    ]

# TODO: Remove after uploading the project. This is only used for development!
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns += staticfiles_urlpatterns()
