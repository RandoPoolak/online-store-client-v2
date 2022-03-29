import {Component, Injectable, OnInit} from '@angular/core';
import {WeatherServiceService} from "../../shared/services/weather-service.service";
import {Address} from "../../shared/models/Address";

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class WeatherWidgetComponent implements OnInit {
  userLocation: Address;
  weatherData:any;
  constructor(
    private weatherWidgetService: WeatherServiceService,
    ) {
  }

  ngOnInit(): void {
    this.updateUserLocation()

  }

  updateUserLocation(){
    if(sessionStorage.getItem('defaultAddress') != null){
      this.userLocation = JSON.parse(sessionStorage.getItem('defaultAddress')!);
      this.getWeatherData(this.userLocation);
    }
  }

  getWeatherData(address: Address){
    this.weatherData = {
      main : {},
      isDay: true,
    };
    this.weatherWidgetService.getWeatherData(address.city).subscribe(data =>{
      let dataString = JSON.stringify(data);
      this.setWeatherData(JSON.parse(dataString));
    })
  }

  setWeatherData(data: String){
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime()< sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
  }
}
