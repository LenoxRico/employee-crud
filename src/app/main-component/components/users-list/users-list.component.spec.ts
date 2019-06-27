import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { EmployeeService } from '../../services';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory, SharedModule } from '@src/app/shared/modules';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material';

fdescribe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [EmployeeService],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        StoreModule.forRoot({})
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    employeeService = TestBed.get(EmployeeService);
  });

  it('Component should be exist', () => {
    expect(component).toBeTruthy();
  });

  it('Service should be exist', () => {
    expect(employeeService).toBeTruthy();
  });

  it('Apply Filter', () => {
    const search = 'Hello World';
    component.dataSource = new MatTableDataSource([]);
    component.applyFilter(search);
    expect(component.dataSource.filter).toBe('hello world');
  });
});
