/**
 * Camera service - Handles camera permissions and setup
 */

import { Camera, CameraType, PermissionStatus } from 'expo-camera';

export interface CameraPermissionResult {
  granted: boolean;
  canAskAgain: boolean;
  status: PermissionStatus;
}

/**
 * Request camera permission from user
 */
export const requestCameraPermission =
  async (): Promise<CameraPermissionResult> => {
    try {
      const { status, canAskAgain, granted } =
        await Camera.requestCameraPermissionsAsync();

      return {
        granted,
        canAskAgain,
        status,
      };
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return {
        granted: false,
        canAskAgain: false,
        status: PermissionStatus.UNDETERMINED,
      };
    }
  };

/**
 * Check current camera permission status
 */
export const checkCameraPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === PermissionStatus.GRANTED;
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return false;
  }
};

/**
 * Get camera type for front-facing camera
 */
export const getFrontCameraType = (): CameraType => {
  return CameraType.front;
};

export default {
  requestCameraPermission,
  checkCameraPermission,
  getFrontCameraType,
};
