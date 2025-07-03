import axios from 'axios';

import { LoaderOpen, LoaderClose } from '../../Utils/Swalhandler/LoaderHandler';
import { handleApiError } from '../../Utils/Swalhandler/Error';

const baseUrl = `${process.env.REACT_APP_API}/sales`;

export const fetchUpdateTime = async () => {
  try {
    const url = `${baseUrl}/updatetime`;
    LoaderOpen();
    const response = await axios.post(url);
    LoaderClose();
    return response.data.AddedTime; // Return the update time value
  } catch (error) {
    LoaderClose();
    handleApiError(error);
  }
};

export const fetchDivisions = async (DivisionCode) => {
  try {
    const url = `${baseUrl}/get/divisions`;

    const response = await axios.post(url, {
      DivisionCode,
    });
    if (response.status === 200) {
      const divisionsData = response.data.divisions.map((division) => ({
        id: division.divisioncode,
        name: division.divisionname,
      }));

      return divisionsData; // Return the divisions data
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchHqs = async (DivisionCode, HqCode) => {
  try {
    const url = `${baseUrl}/get/hqs`;
    const body = {
      DivisionCode,
      HqCode,
    };
    LoaderOpen('Please wait  Headquarters loading');
    const response = await axios.post(url, body);
    const hqCodes = response.data.hqs.map((hq) => ({
      id: hq.HQCode,
      name: hq.HQName,
    }));
    LoaderClose();
    return hqCodes; // Return the HQ codes data
  } catch (error) {
    LoaderClose();
    handleApiError(error);
  }
};

export const isDivisionEnable = (saleAccess) => {
  const enable =
    saleAccess.length > 1 || saleAccess[0].DivisionCode.toLowerCase() === 'all';
  return enable;
};

export const isHqEnabled = (saleAccess) => {
  let enable = false;
  for (const element of saleAccess) {
    if (
      element?.SaleHQCodes?.toLowerCase() === 'all' ||
      element?.SaleHQCodes?.split('~').length > 1
    ) {
      enable = true;
      break;
    }
  }
  return enable;
};
