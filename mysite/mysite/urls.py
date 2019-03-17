from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

from wagtail.admin import urls as wagtailadmin_urls
from graphene_django.views import GraphQLView

urlpatterns = [
    path('django-admin/', admin.site.urls),

    path('admin/', include(wagtailadmin_urls)),
    path('documents/', include("wagtail.documents.urls")),
    path('internal/', include('wagtail.core.urls')),

    path('', csrf_exempt(GraphQLView.as_view())),
    path('graphiql/', csrf_exempt(GraphQLView.as_view(graphiql=True)))
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
