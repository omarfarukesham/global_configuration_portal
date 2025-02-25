/* eslint-disable react-refresh/only-export-components */
import RouteAuthorization from '@/components/layout/RouteAuthorization';
import permissions from '@/configuration/permissions';
import { lazy } from 'react';

const CreateAttribute = lazy(() =>
  import('@/pages/create-attribute/CreateAttribute'),
);
const Attributes = lazy(() => import('@/pages/attributes/Attributes'));

// These are the children routes of the main layout
const attributeRoutes = [
  {
    path: 'attributes',
    element: (
      <RouteAuthorization
        element={Attributes}
        permission={permissions.VIEW_ATTRIBUTE}
      />
    ),
  },
  {
    path: 'create-attribute',
    element: (
      <RouteAuthorization
        element={CreateAttribute}
        permission={permissions.EDIT_ATTRIBUTE}
      />
    ),
  },
];

export default attributeRoutes;
