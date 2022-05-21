export enum ETestStatus {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  UNKNOWN = 'UNKNOWN',
}
export const getHealthStatusTextAndColor = (status: any) => {
  let colors = 'text-gray-400';
  let text = '-';
  if (status) {
    if (status === ETestStatus.POSITIVE) {
      colors = 'text-red-700';
      text = 'مثبت';
    } else if (status === ETestStatus.NEGATIVE) {
      colors = 'text-green-700';
      text = 'منفی';
    } else if (status === ETestStatus.UNKNOWN) {
      colors = 'text-gray-400'; // white
      text = 'فاقد آزمایش';
    }
  }
  return {colors, text};
};

export const getStatusColor = (status: any) => {
  let colors = 'from-gray-400 to-gray-300';
  if (status) {
    if (status === ETestStatus.UNKNOWN) {
      colors = 'from-orange-600 to-orange-400';
    } else if (status === ETestStatus.POSITIVE) {
      colors = 'from-red-700 to-red-500';
    } else if (status === ETestStatus.NEGATIVE) {
      colors = 'from-green-600 to-green-500';
    }
  }
  return {colors};
};

export const getVaccinesStatusText = (vaccines: number) => {
  let text = '-';
  if (vaccines || vaccines === 0) {
    if (vaccines > 2) {
      text = 'دوز سوم و بیشتر';
    } else if (vaccines > 1) {
      text = 'دوز دوم';
    } else if (vaccines > 0) {
      text = 'دوز اول';
    }
  }
  return {text};
};
