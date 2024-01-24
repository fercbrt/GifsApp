import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'o9n6EALTjsLUDpZ3F6cQ4Dh8vbwFiMeQ'
const GIPHY_END_POINT = 'https://api.giphy.com/v1/gifs'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagHistory: string[] = [];

  private _gifsList: Gif[] = []

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('GifsService ready');
  }

  get tagsHitory(){
    return [...this._tagHistory];
  }

  get gifsList(){
    return [...this._gifsList];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if( this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag );
    }

    this._tagHistory.unshift( tag );

    this._tagHistory = this._tagHistory.splice(0,10);

    this.saveLocalStorage();

  }

  async searchTag(tag: string): Promise<void> {
    if( tag.length === 0 ) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(`${ GIPHY_END_POINT }/search`, {params})
      .subscribe( resp => {
        this._gifsList = resp.data;
      });

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void {
    if(localStorage.getItem('history')){
      this._tagHistory = JSON.parse(localStorage.getItem('history')!);
      if ( this._tagHistory.length === 0 ) return;
      this.searchTag( this._tagHistory[0]);
    }
  }
}
