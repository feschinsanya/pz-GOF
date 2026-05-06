import { LightsSystem, HVACSystem, SecuritySystem, EntertainmentSystem } from './subsystems';

// ─── Facade ───────────────────────────────────────────────────────────────────
export class SmartHomeFacade {
  private lights        = new LightsSystem();
  private hvac          = new HVACSystem();
  private security      = new SecuritySystem();
  private entertainment = new EntertainmentSystem();

  arriveHome(): void {
    console.log('  [Facade] → arriveHome scenario:');
    this.security.disarm();
    this.lights.on();
    this.hvac.heat();
    this.entertainment.playMusic();
  }

  leaveHome(): void {
    console.log('  [Facade] → leaveHome scenario:');
    this.entertainment.off();
    this.lights.off();
    this.hvac.off();
    this.security.arm();
  }

  movieNight(): void {
    console.log('  [Facade] → movieNight scenario:');
    this.lights.dim();
    this.hvac.cool();
    this.entertainment.playMovie();
  }
}

