import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [

  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

 }
