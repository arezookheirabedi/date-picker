import useHasPermissions from 'src/hooks/useHasPermissions';

const withPermission = (Component: any, requiredPermissions: any[]) => {
  const ComponentParent = () => {
    const hasPermission = useHasPermissions(requiredPermissions);
    return hasPermission ? <Component /> : null;
  };

  return ComponentParent;
};

export default withPermission;
