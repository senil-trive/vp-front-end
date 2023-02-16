import React, { ReactElement, ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getErrorField } from "../../../utils/errorMessages";

type Props = {
  className?: string;
  children: ReactNode;
  defaultValues?: any;
  errors?: any[];
  onSubmit: SubmitHandler<any>;
};

export const Form = ({
  onSubmit,
  errors,
  children,
  defaultValues,
  ...rest
}: Props) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors: formErrors },
  } = useForm({ defaultValues });

  const createChild = (child: any, hasErrors?: boolean) => {
    return React.createElement(child.type, {
      ...{
        ...child.props,
        errors: hasErrors,
        register,
        key: child.props.name,
        placeholder: "auto-generated",
      },
    });
  };

  const childWithErrorText = (child: any) => {
    return <>{createChild(child, true)}</>;
  };

  const alterChild = (child: ReactElement) => {
    if (child?.props?.name) {
      const hasErrors = child?.props?.name && formErrors?.[child?.props?.name];

      if (hasErrors) {
        return childWithErrorText(child);
      }

      child = createChild(child);
    }

    return child as ReactNode;
  };

  const iterateOverChildren: (c: ReactNode) => ReactNode = (children) => {
    return React.Children.map(children, (child) => {
      const tempChild = child as ReactElement<Props>;

      if (!React.isValidElement(child)) {
        return child;
      }

      if (tempChild?.props?.children) {
        const childs = tempChild.props.children;
        child = React.cloneElement(tempChild, {
          children: iterateOverChildren(childs),
        });
      }

      return alterChild(child);
    });
  };

  useEffect(() => {
    errors?.forEach((err) => {
      const errorField = getErrorField(err);
      if (errorField.type) {
        setError(errorField.type, { message: `${errorField.type} is invalid` });
      }
    });
  }, [errors, setError]);

  return (
    <form {...rest} onSubmit={handleSubmit(onSubmit)}>
      {iterateOverChildren(children)}
    </form>
  );
};
