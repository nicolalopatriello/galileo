import {ActivatedRoute} from '@angular/router';
import {GllBreadCrumb} from '../components/galileo-dashboard-layout/breadcrumb/gll-breadcrumb';


export function buildGalileoBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: GllBreadCrumb[] = []): GllBreadCrumb[] {
  let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
  let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

  const lastRoutePart = path.split('/').pop();
  const isDynamicRoute = lastRoutePart.startsWith(':');
  if (isDynamicRoute && !!route.snapshot) {
    const paramName = lastRoutePart.split(':')[1];
    if (!!route.snapshot.data['breadcrumbResolveKey']) {
      const d = route.snapshot.data['breadcrumbResolveKey'].split('.');
      const resolvedLabel = route.snapshot.data[d[0]][d[1]];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = resolvedLabel;
    } else {
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
  }

  const nextUrl = path ? `${url}/${path}` : url;

  let a = [];
  route.pathFromRoot.forEach(i => {
    if (i.snapshot.url.length) {
      a.push(...i.snapshot.url);
    }
  })
  const newUrl = a.join('/');
  const breadcrumb: GllBreadCrumb = {
    label,
    url: route.children.length === 0 ? null : newUrl
  };
  const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
  if (route.firstChild) {
    return buildGalileoBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
  }
  return newBreadcrumbs;
}
