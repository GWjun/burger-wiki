import { Patty } from '@prisma/client';

export const pattyTypesList = Object.values(Patty) as Patty[];

export const pattyNameMap: { [key in Patty]: string } = {
  meat: '고기',
  shrimp: '새우',
  chicken: '치킨',
  squid: '오징어',
  vegan: '비건',
  undefined: '기타',
};
