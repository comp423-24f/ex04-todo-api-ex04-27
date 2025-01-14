import { Injectable, Signal, signal } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Profile, ProfileService, Permission } from './profile/profile.service';
import { AdminSettingsNavigationData } from './navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private profile: Signal<Profile | undefined> = signal(undefined);
  private profile$: Observable<Profile | undefined>;

  constructor(profileService: ProfileService) {
    this.profile = profileService.profile;
    this.profile$ = profileService.profile$;
  }

  checkSignal(action: string, resource: string): boolean {
    return (
      this.profile &&
      this.hasPermission(this.profile()!.permissions, action, resource)
    );
  }

  check(action: string, resource: string): Observable<boolean> {
    return this.profile$.pipe(
      map((profile) => {
        if (profile === undefined) {
          return false;
        } else {
          return this.hasPermission(profile.permissions, action, resource);
        }
      })
    );
  }

  private hasPermission(
    permissions: Permission[],
    action: string,
    resource: string
  ) {
    if (!permissions) {
      return false;
    }
    let permission = permissions.find((p) =>
      this.checkPermission(p, action, resource)
    );
    return permission !== undefined;
  }

  private checkPermission(
    permission: Permission,
    action: string,
    resource: string
  ) {
    let actionRegExp = this.expandPattern(permission.action);
    if (actionRegExp.test(action)) {
      let resourceRegExp = this.expandPattern(permission.resource);
      return resourceRegExp.test(resource);
    } else {
      return false;
    }
  }

  private expandPattern(pattern: string): RegExp {
    return new RegExp(`^${pattern.replaceAll('*', '.*')}$`);
  }
}
