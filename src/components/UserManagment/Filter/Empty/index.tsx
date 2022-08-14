import React, { CSSProperties, ReactNode } from "react";

interface IProps {
  description?: string | null | undefined;
  image?: ReactNode | null | undefined;
  imageStyle?: CSSProperties;
}

const Empty: React.FC<IProps> = (props) => {
  const { image, description } = props;

  return (
    <div className="flex flex-col items-center justify-center text-gray-400">
      <div>
        {image || (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.25}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
        )}
      </div>
      {description && description.length > 0 ? (
        <div>{description}</div>
      ) : (
        <div className="">بدون داده</div>
      )}
    </div>
  );
};

export default Empty;
