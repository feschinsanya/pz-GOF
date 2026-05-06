export class LightsSystem {
  on(): void   { console.log('  [Lights] Lights turned ON'); }
  off(): void  { console.log('  [Lights] Lights turned OFF'); }
  dim(): void  { console.log('  [Lights] Lights dimmed to 30%'); }
}

export class HVACSystem {
  heat(): void { console.log('  [HVAC]   Heating to 22°C'); }
  cool(): void { console.log('  [HVAC]   Cooling to 20°C'); }
  off(): void  { console.log('  [HVAC]   HVAC turned OFF'); }
}

export class SecuritySystem {
  arm(): void    { console.log('  [Security] Alarm ARMED'); }
  disarm(): void { console.log('  [Security] Alarm DISARMED'); }
}

export class EntertainmentSystem {
  playMusic(): void { console.log('  [Entertainment] Playing relaxing music'); }
  playMovie(): void { console.log('  [Entertainment] Projector ON, movie starting...'); }
  off(): void       { console.log('  [Entertainment] Entertainment system OFF'); }
}

