import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { GenderEnum } from '../models/enum/gender.enum';
import { PowerLevelEnum } from '../models/enum/power-level.enum';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-heroe.request.type';
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
    profile: {
      origin: 'Lab',
      height: '1.80 m',
      creationYear: 2026,
      species: 'Humano',
      gender: GenderEnum.Male,
      primaryColor: 'Azul',
      logoUrl: 'https://example.com/hero.png',
    },
    power: {
      powers: ['Assert'],
      level: PowerLevelEnum.MEDIUM,
      secretPower: 'Detecta regresiones',
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
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

  it('getById should return undefined when id does not exist', async () => {
    const hero = await firstValueFrom(service.getById(999999));
    expect(hero).toBeUndefined();
  });

  it('getByName should filter case-insensitive', async () => {
    const result = await firstValueFrom(service.getByName('man'));
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((h) => h.name === 'Batman')).toBeTrue();
  });

  it('create should add a new hero and generate id', async () => {
    const before = await firstValueFrom(service.getAll());
    const created = await firstValueFrom(service.create(buildCreateRequest('New Hero')));
    const after = await firstValueFrom(service.getAll());

    expect(created.id).toBeGreaterThan(0);
    expect(created.name).toBe('New Hero');
    expect(after.length).toBe(before.length + 1);
    expect(after.some((h) => h.id === created.id)).toBeTrue();
  });

  it('update should modify an existing hero', async () => {
    const created = await firstValueFrom(service.create(buildCreateRequest('Hero To Update')));

    const updated = await firstValueFrom(
      service.update({
        id: created.id,
        name: 'Updated Hero',
      }),
    );

    const fetched = await firstValueFrom(service.getById(created.id));

    expect(updated.name).toBe('Updated Hero');
    expect(fetched?.name).toBe('Updated Hero');
  });

  it('update should throw error when hero does not exist', async () => {
    await expectAsync(
      firstValueFrom(
        service.update({
          id: 999999,
          name: 'No Hero',
        }),
      ),
    ).toBeRejectedWithError('Super heroe no encontrado');
  });

  it('delete should remove hero by id', async () => {
    const created = await firstValueFrom(service.create(buildCreateRequest('Hero To Delete')));
    const before = await firstValueFrom(service.getAll());

    await firstValueFrom(service.delete(created.id));

    const after = await firstValueFrom(service.getAll());
    const deleted = await firstValueFrom(service.getById(created.id));

    expect(after.length).toBe(before.length - 1);
    expect(deleted).toBeUndefined();
  });
});
