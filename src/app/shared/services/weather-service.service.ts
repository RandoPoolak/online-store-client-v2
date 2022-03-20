import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  data:any;
  private WEATHER_API_URL = "/weather"

  constructor(
    private httpClient: HttpClient,
    ) {
  }

  public getWeatherData(city: String){
    return this.httpClient.get(this.WEATHER_API_URL+"/"+city);
  }
}
