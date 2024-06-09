import { Particle } from '../../Particle';
import { ObjectProperty } from '../editor/Types';
import { SpawnShape } from './SpawnShape';

/**
 * A class for spawning particles in a circle or ring.
 * Can optionally apply rotation to particles so that they are aimed away from the center of the circle.
 *
 * Example config:
 * ```javascript
 * {
 *     type: 'oval',
 *     data: {
 *          radius: 30,
 *          x: 0,
 *          y: 0,
 *          innerRadius: 10,
 *          rotation: true
 *     }
 * }
 * ```
 */
export class Oval implements SpawnShape {
    public static type = 'oval';
    public static editorConfig: ObjectProperty = null;
    /**
     * X position of the center of the shape.
     */
    public x: number;
    /**
     * Y position of the center of the shape.
     */
    public y: number;
    /**
     * Radius of circle, or outer radius of a ring.
     */
    public radius: number;
    /**
     * Inner radius of a ring. Use 0 to have a circle.
     */
    public innerRadius: number;
    public semiMajorAxis: number;
    public semiMinorAxis: number;
    /**
     * If rotation should be applied to particles.
     */
    public rotation: boolean;

    constructor(config: {
        /**
         * Radius of circle, or outer radius of a ring. Note that this uses the full name of 'radius',
         * where earlier versions of the library may have used 'r'.
         */
        radius: number;
        /**
         * X position of the center of the shape.
         */
        x: number;
        /**
         * Y position of the center of the shape.
         */
        y: number;
        semiMinorAxis: number;
        semiMajorAxis: number;
        /**
         * If rotation should be applied to particles, pointing them away from the center of the oval.
         * Defaults to false.
         */
        affectRotation?: boolean
    }) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.rotation = !!config.affectRotation;
        this.semiMajorAxis = config.semiMinorAxis;
        this.semiMinorAxis = config.semiMajorAxis;
    }

    getRandPos(particle: Particle): void {
        // Generate semiMajorAxis random angle between 0 and 2*PI
        const t = Math.random() * 2 * Math.PI;

        // Calculate the coordinates based on the parametric equations
        const x = this.semiMajorAxis * Math.cos(t);
        const y = this.semiMinorAxis * Math.sin(t);

        particle.position.x = x;
        particle.position.y = y;
    }
}
