import axiosIns from "./index";
export const getTitles = async () => {
    const response = await axiosIns.get('/titles');
    return response; 
};

export const getGenders = async () => {
    const response = await axiosIns.get('/genders');
    return response; 
};

export const getMartialStatus = async () => {
    const response = await axiosIns.get('/marital');
    return response; 
};

export const getCareOf= async () => {
    const response = await axiosIns.get('/careof');
    return response; 
};

export const getState= async () => {
    const response = await axiosIns.get('/states');
    return response; 
};
export const getAge=async () =>{
    const response =await axiosIns.get('/age-groups');
    return response;
}
export const getPackage= async () => {
    const response = await axiosIns.get(`/packages`);
    return response; 
};

export const getCity = async (params) => {
    const response = await axiosIns.get('/cities', { params });
    return response;
  };

export const getPregOptions= async () => {
    const response = await axiosIns.get('/pregOptions');
    return response; 
};