import { companies } from "../data/companies";
import { companyProducts } from "../data/companyProducts";
import type { SearchFormValues, SearchResult } from "../types/insurance";
import { rankProducts } from "../utils/rankProducts";

export function searchInsurance(values: SearchFormValues): SearchResult {
  const matchedCompanies = companies.filter((company) => {
    if (!company.active) return false;

    if (values.preferredCompany !== "전체") {
      return company.name === values.preferredCompany;
    }

    return true;
  });

  const matchedCompanyIds = matchedCompanies.map((company) => company.id);

  const matchedProducts = companyProducts.filter((product) => {
    const companyMatch = matchedCompanyIds.includes(product.companyId);
    const categoryMatch = product.category === values.goal;
    const genderMatch =
      product.gender === "all" || product.gender === values.gender;

    return companyMatch && categoryMatch && genderMatch;
  });

  const topRecommendations = rankProducts(matchedProducts, values);

  return {
    matchedCompanies,
    matchedProducts,
    topRecommendations,
  };
}