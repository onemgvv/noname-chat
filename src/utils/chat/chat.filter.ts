import { Filter } from './interface/filter.interface';

export const correctAge = (author: Filter, target: Filter): boolean => {
  if (
    !target.search &&
    author.search?.ageMax &&
    author.search?.ageMin &&
    author.search?.ageMin <= target.age &&
    author.search?.ageMax >= target.age
  ) {
    return true;
  }

  if (
    author.search?.ageMax &&
    author.search?.ageMin &&
    author.search?.ageMin <= target.age &&
    author.search?.ageMax >= target.age &&
    target.search?.ageMin &&
    target.search?.ageMax &&
    target.search?.ageMin <= author.age &&
    target.search?.ageMax >= author.age
  ) {
    return true;
  }

  return false;
};

export const correctCity = (author: Filter, target: Filter) => {
  if (
    author.search?.city &&
    target.search?.city &&
    author.search?.city === target.city &&
    target.search?.city === author.city
  ) {
    return true;
  }

  if (
    author.search?.city &&
    !target.search?.city &&
    author.search?.city === target.city
  ) {
    return true;
  }

  if (
    !author.search?.city &&
    target.search?.city &&
    target.search?.city === author.city
  ) {
    return true;
  }

  if (!author.search?.city && !target.search?.city) {
    return true;
  }

  return false;
};

export const currectSex = (author: Filter, target: Filter) => {
  if (
    author.search?.sex !== 'all' &&
    target.search?.sex !== 'all' &&
    author.search?.sex === target.sex &&
    target.search?.sex === author.sex
  ) {
    return true;
  }

  if (
    author.search?.sex === 'all' &&
    (target.sex === 'male' || target.sex === 'female') &&
    target.search?.sex !== 'all' &&
    target.search?.sex === author.sex
  ) {
    return true;
  }

  if (
    author.search?.sex !== 'all' &&
    author.search?.sex === target.sex &&
    target.search?.sex === 'all' &&
    (author.sex === 'male' || author.sex === 'female')
  ) {
    return true;
  }

  if (author.search?.sex === undefined || target.search?.sex === undefined) {
    return true;
  }

  if (
    target.search?.sex !== 'all' &&
    author.search?.sex !== 'all' &&
    author.search?.sex === target.sex
  ) {
    return true;
  }

  return false;
};
