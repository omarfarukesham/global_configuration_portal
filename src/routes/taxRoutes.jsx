/* eslint-disable react-refresh/only-export-components */
import RouteAuthorization from '@/components/layout/RouteAuthorization';
import permissions from '@/configuration/permissions';
import { lazy } from 'react';

const TaxRules = lazy(() => import('@/pages/tax-rules/TaxRules'));
const TaxCategories = lazy(() =>
  import('@/pages/tax-categories/TaxCategories'),
);
const TaxSubCategories = lazy(() =>
  import('@/pages/tax-sub-categories/TaxSubCategories'),
);
const TaxRates = lazy(() => import('@/pages/tax-rates/TaxRates'));

// These are the children routes of the main layout
const taxRuleRoutes = [
  {
    path: 'tax-rules',
    element: (
      <RouteAuthorization
        element={TaxRules}
        permission={permissions.VIEW_TAX}
      />
    ),
  },
  {
    path: 'tax-categories',
    element: (
      <RouteAuthorization
        element={TaxCategories}
        permission={permissions.VIEW_TAX}
      />
    ),
  },
  {
    path: 'tax-sub-categories',
    element: (
      <RouteAuthorization
        element={TaxSubCategories}
        permission={permissions.VIEW_TAX}
      />
    ),
  },
  {
    path: 'tax-rates',
    element: (
      <RouteAuthorization
        element={TaxRates}
        permission={permissions.VIEW_TAX}
      />
    ),
  },
];

export default taxRuleRoutes;
