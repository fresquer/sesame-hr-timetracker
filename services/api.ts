import Axios, { AxiosError } from "axios";
import { TrankInfoModel } from "../interfaces";
import { getLastTracking } from "../util/time-utils";

// Nota: En un proyecto real, la consiguracion seria más compleja (y flexible) pero para este casi he decidido añadirle via "defaults" para dejarlo limpio
const baseUrl = "https://api-test.sesametime.com/schedule/v1/";
Axios.defaults.baseURL = baseUrl;
Axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;

// Nota: Aquí he decidido hacer un loop entre la paginacion de la api para recoger todos los registros
// y así encontrar el ultimo usado. Entiendo que esto en un caso real, se haria con una api que devolviese este ultimo
// ya que la llamada tarda un poco
export const getTrackingInfo = async () => {
  try {
    const response = await Axios.get("/work-entries");
    const totalPages = response.data.meta.lastPage;
    const promiseArray = [];
    for (let i = 1; i < totalPages + 1; i++) {
      promiseArray.push(Axios.get(`/work-entries?page=${i}`));
    }
    let resolvedPromises = await Promise.all(promiseArray);
    let data: TrankInfoModel[] = [];
    for (let i = 0; i < resolvedPromises.length; i++) {
      data = [...data, ...resolvedPromises[i].data.data];
    }
    const track = getLastTracking(data);
    return track;
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data;
  }
};

export const clockIn = (employeeId: string) => {
  return clockPost("clock-in", "workEntryIn", employeeId);
};
export const clockOut = (employeeId: string) => {
  return clockPost("clock-out", "workEntryOut", employeeId);
};

const clockPost = async (
  typeUrl: string,
  typeEntry: string,
  employeeId: string
) => {
  const dataToPost = {
    employeeId,
    [typeEntry]: {
      coordinates: {
        latitude: null,
        longitude: null,
      },
    },
  };
  try {
    const res = await Axios.post(`work-entries/${typeUrl}`, dataToPost);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data;
  }
};
