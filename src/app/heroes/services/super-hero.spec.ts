import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { fakeBackendInterceptor } from '../../core/interceptors/fake-backend-interceptor';
import { GenderEnum } from '../models/enum/gender.enum';
import { PowerLevelEnum } from '../models/enum/power-level.enum';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-hero.request.type';
import { SuperHeroService } from './super-hero';

describe('SuperHeroService', () => {
  let service: SuperHeroService;

  const buildCreateRequest = (name = 'Test Hero'): CreateSuperHeroRequest => ({
    name,
    publisherId: 2,
    affiliation: [3],
    civilOccupation: 'QA Hero',
    weapons: ['Laptop'],
    abilities: ['Testing'],
    weaknesses: ['Bugs'],
    greeting: `Hello, I am ${name}`,
    profile: {
      origin: 'Lab',
      height: '1.80 m',
      creationYear: 2026,
      species: 'Humano',
      gender: GenderEnum.Male,
      primaryColor: 'burgundy',
      logoUrl: 'https://example.com/hero.png',
    },
    power: {
      powers: ['Assert'],
      level: PowerLevelEnum.MEDIUM,
      secretPower: 'Detecta regresiones',
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([fakeBackendInterceptor]))],
    });
    service = TestBed.inject(SuperHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should return initial heroes', async () => {
    const heroes = await firstValueFrom(service.getAll());
    expect(heroes.length).toBeGreaterThan(0);
  });

  it('getById should return hero when id exists', async () => {
    const hero = await firstValueFrom(service.getById(1));
    expect(hero).toBeDefined();
    expect(hero?.name).toBe('Superman');
  });

  it('getById should return null when id does not exist', async () => {
    const hero = await firstValueFrom(service.getById(999999));
    expect(hero).toBeNull();
  });

  it('getByName should filter case-insensitive', async () => {
    const resultByName = await firstValueFrom(service.getByName('man'));
    expect(resultByName.length).toBeGreaterThan(0);
    expect(resultByName.some((h) => h.name === 'Batman')).toBeTrue();
  });

  it('create should add a new hero and generate id', async () => {
    const allRegistry = await firstValueFrom(service.getAll());
    const heroCreationResult = await firstValueFrom(service.create(buildCreateRequest('New Hero')));
    const updatedResults = await firstValueFrom(service.getAll());

    expect(heroCreationResult.id).toBeGreaterThan(0);
    expect(heroCreationResult.name).toBe('New Hero');
    expect(updatedResults.length).toBe(allRegistry.length + 1);
    expect(updatedResults.some((h) => h.id === heroCreationResult.id)).toBeTrue();
  });

  it('update should modify an existing hero', async () => {
    const buildAHero = await firstValueFrom(service.create(buildCreateRequest('Hero To Update')));
    const updated = await firstValueFrom(
      service.update({ id: buildAHero.id, name: 'Updated Hero' }),
    );
    const fetched = await firstValueFrom(service.getById(buildAHero.id));

    expect(updated.name).toBe('Updated Hero');
    expect(fetched?.name).toBe('Updated Hero');
  });

  it('update should throw error when hero does not exist', async () => {
    await expectAsync(
      firstValueFrom(service.update({ id: 999999, name: 'No Hero' })),
    ).toBeRejected();
  });

  it('delete should remove hero by id', async () => {
    const heroToDelete = await firstValueFrom(service.create(buildCreateRequest('Hero To Delete')));
    const allRegistry = await firstValueFrom(service.getAll());

    await firstValueFrom(service.delete(heroToDelete.id));

    const updatedResults = await firstValueFrom(service.getAll());
    const deleted = await firstValueFrom(service.getById(heroToDelete.id));

    expect(updatedResults.length).toBe(allRegistry.length - 1);
    expect(deleted).toBeNull();
  });
});
