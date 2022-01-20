export enum NombrePosition {
  left = 0.314793901750423,
  top = 0.24211968935587,
  width = 0.347261434217956,
  height = 0.210141617176793,
}

export enum DomicilioPosition {
  left = 0.314793901750423,
  top = 0.411146642302421,
  width = 0.347261434217956,
  height = 0.210141617176793,
}

export enum CVEPosition {
  left = 0.314793901750423,
  top = 0.639561443581544,
  width = 0.441840767927724,
  height = 0.0593878483325719,
}

export enum CURPPosition {
  left = 0.314793901750423,
  top = 0.703517587939699,
  width = 0.350084697910785,
  height = 0.0593878483325719,
}

export enum LocalidadPosition {
  left = 0.314793901750423,
  top = 0.7811786203746,
  width = 0.550536420101638,
  height = 0.137048880767474,
}

export interface rectanglePosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function GetArrayPositions(
  width: number,
  height: number
): rectanglePosition[] {
  let rectangles: rectanglePosition[] = [];
  // Nombre
  const nombre: rectanglePosition = {
    left: Math.round(width * NombrePosition.left),
    top: Math.round(height * NombrePosition.top),
    width: Math.round(width * NombrePosition.width),
    height: Math.round(height * NombrePosition.height),
  };
  rectangles.push(nombre);
  // Domicilio
  const domiclio: rectanglePosition = {
    left: Math.round(width * DomicilioPosition.left),
    top: Math.round(height * DomicilioPosition.top),
    width: Math.round(width * DomicilioPosition.width),
    height: Math.round(height * DomicilioPosition.height),
  };
  rectangles.push(domiclio);
  // Clave Elector
  const claveElector: rectanglePosition = {
    left: Math.round(width * CVEPosition.left),
    top: Math.round(height * CVEPosition.top),
    width: Math.round(width * CVEPosition.width),
    height: Math.round(height * CVEPosition.height),
  };
  rectangles.push(claveElector);
  // CURP 
  const curp: rectanglePosition = {
    left: Math.round(width * CURPPosition.left),
    top: Math.round(height * CURPPosition.top),
    width: Math.round(width * CURPPosition.width),
    height: Math.round(height * CURPPosition.height),
  };
  rectangles.push(curp);
  // Localidad
  const localidad: rectanglePosition = {
    left: Math.round(width * LocalidadPosition.left),
    top: Math.round(height * LocalidadPosition.top),
    width: Math.round(width * LocalidadPosition.width),
    height: Math.round(height * LocalidadPosition.height),
  };
  rectangles.push(localidad);
  console.log(rectangles);
  return rectangles;
}
