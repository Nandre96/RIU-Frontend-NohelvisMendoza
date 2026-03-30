import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AFFILIATION_OPTIONS } from '../../models/const/affiliation.const';
import { GODLIKE_POWER_LEVEL_META } from '../../models/const/power-level.const';
import { UNKNOWN_PUBLISHER_INFO } from '../../models/const/publisher.const';
import { SuperHeroView } from '../../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../services/super-hero-view';
import { SuperHeroList } from './super-hero-list';

const mockHeroes: SuperHeroView[] = Array.from({ length: 15 }, (_, i) => {
  const heroId = i + 1;
  const superHero = {
    id: heroId,
    name: `Hero ${heroId}`,
    slug: `hero-${heroId}`,
    civilOccupation: 'Occupation',
    abilities: [
      'programar',
      'pensar',
      'resolver problemas',
      'trabajar en equipo',
      'aprender rápido',
    ],
    weapons: ['teclado', 'monitor', 'café', 'notebook', 'mouse'],
    weaknesses: ['bugs', 'epics'],
    affiliation: [i > 15 ? AFFILIATION_OPTIONS[0] : AFFILIATION_OPTIONS[i]],
    profile: {
      origin: 'Origin',
      height: '1.50',
      creationYear: 1996,
      greeting: `Hello, I am Hero ${heroId}`,
      species: 'Human',
      gender: { id: 1, name: 'Female' },
      primaryColor: 'blue',
      logoUrl: 'https://i.pinimg.com/1200x/5e/59/c4/5e59c43bce967816d5ef4a53eaad2192.jpg',
    },
    power: {
      powers: ['Jira', 'Confluence', 'GitHub', 'CI/CD', 'Testing'].join(', '),
      level: GODLIKE_POWER_LEVEL_META,
      secretPower: 'Secret',
    },
    publisher: UNKNOWN_PUBLISHER_INFO,
  };
  return superHero;
});

const MIN_PAGE_SIZE = 5;
const INITIAL_PAGE_SIZE = 10;
const TOTAL_HEROES = mockHeroes.length;
const PAGINATION_MOCK = { pageIndex: 1, pageSize: INITIAL_PAGE_SIZE, length: TOTAL_HEROES };

describe('SuperHeroList', () => {
  let componentToTest: SuperHeroList;
  let fixture: ComponentFixture<SuperHeroList>;
  let viewServiceSpy: jasmine.SpyObj<SuperHeroViewService>;

  beforeEach(async () => {
    const mockHero = signal<SuperHeroView[]>(mockHeroes);
    const isLoading = signal(false);

    viewServiceSpy = jasmine.createSpyObj('SuperHeroViewService', ['setSearch'], {
      superHeroes: mockHero,
      allSuperHeroesResource: { isLoading: isLoading },
    });

    await TestBed.configureTestingModule({
      imports: [SuperHeroList],
      providers: [provideRouter([]), { provide: SuperHeroViewService, useValue: viewServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroList);
    componentToTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentToTest).toBeTruthy();
  });

  it('should show first page of heroes (pageSize 10)', () => {
    expect(componentToTest.pagedSuperHeroes().length).toBe(INITIAL_PAGE_SIZE);
  });

  it('should calculate total heroes correctly', () => {
    expect(componentToTest.totalHeroes()).toBe(TOTAL_HEROES);
  });

  it('should update page on onPageChange', () => {
    componentToTest.onPageChange(PAGINATION_MOCK);
    expect(componentToTest.pageIndex()).toBe(1);
    expect(componentToTest.pagedSuperHeroes().length).toBe(MIN_PAGE_SIZE);
  });

  it('should show remaining heroes on last page', () => {
    componentToTest.onPageChange(PAGINATION_MOCK);
    const pagedHeroes = componentToTest.pagedSuperHeroes();
    expect(pagedHeroes.length).toBe(MIN_PAGE_SIZE);
    expect(pagedHeroes[0].name).toBe('Hero 11');
  });

  it('should call setSearch when searchControl changes', async () => {
    componentToTest.searchControl.setValue('batman');
    await fixture.whenStable();
    expect(viewServiceSpy.setSearch).toHaveBeenCalled();
  });
});
