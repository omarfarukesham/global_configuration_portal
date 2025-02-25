/* eslint-disable react-refresh/only-export-components */
import RouteAuthorization from '@/components/layout/RouteAuthorization';
import permissions from '@/configuration/permissions';
import CustomizeCategories from '@/pages/customize-categories/CustomizeCategories';
import CustomizeCategoriesCreate from '@/pages/customize-categories/customize-categories-create/CustomizeCategoriesCreate';
import CustomizeCategoriesEdit from '@/pages/customize-categories/customize-categories-edit/CustomizeCategoriesEdit';
import CustomizeCategoriesView from '@/pages/customize-categories/customize-categories-view/CustomizeCategoriesView';
import GlobalConfigurations from '@/pages/global-configurations/GlobalConfigurations';
import ProductPools from '@/pages/product-pool/ProductPools';
import ProductPoolCreate from '@/pages/product-pool/product-pool-create/ProductPoolCreate';
import ProductPoolEdit from '@/pages/product-pool/product-pool-edit/ProductPoolEdit';
import ProductPoolView from '@/pages/product-pool/product-pool-view/ProductPoolView';
import ProductShelves from '@/pages/product-shelves/ProductShelves';
import ProductShelfCreate from '@/pages/product-shelves/product-shelf-create/ProductShelfCreate';

// These are the children routes of the main layout
const globalConfigRoutes = [
  {
    path: 'global-config',
    element: (
      <RouteAuthorization
        element={GlobalConfigurations}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'product-pools',
    element: (
      <RouteAuthorization
        element={ProductPools}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'product-shelf',
    element: (
      <RouteAuthorization
        element={ProductShelves}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },

  {
    path: 'customize-categories',
    element: (
      <RouteAuthorization
        element={CustomizeCategories}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'customize-categories/add',
    element: (
      <RouteAuthorization
        element={CustomizeCategoriesCreate}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },

  {
    path: 'customize-categories/:id',
    element: (
      <RouteAuthorization
        element={CustomizeCategoriesView}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'customize-categories/:id/edit',
    element: (
      <RouteAuthorization
        element={CustomizeCategoriesEdit}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'product-shelf/add-shelves',
    element: (
      <RouteAuthorization
        element={ProductShelfCreate}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'product-pools/add-pools',
    element: (
      <RouteAuthorization
        element={ProductPoolCreate}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'product-pools/:id/edit-pools',
    element: (
      <RouteAuthorization
        element={ProductPoolCreate}
        permission={permissions.VIEW_CONFIG}
      />
    ),
  },
  {
    path: 'product-pools-view/:id',
    element: (
      <RouteAuthorization
        element={ProductPoolView}
        permission={permissions.EDIT_CONFIG}
      />
    ),
  },
  {
    path: 'product-pools/:id/edit',
    element: (
      <RouteAuthorization
        element={ProductPoolEdit}
        permission={permissions.EDIT_CONFIG}
      />
    ),
  },
];

export default globalConfigRoutes;
