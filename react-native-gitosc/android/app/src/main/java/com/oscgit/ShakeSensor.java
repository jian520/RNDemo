package com.oscgit;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.os.Vibrator;

/**
 * 处理手机摇晃的监听
 * Created by rplees on 4/21/16.
 * @author rplees
 *
 */
public abstract class ShakeSensor implements SensorEventListener {
    // 每隔一个时间段获取一个采样点：100毫秒
    // 三个轴的加速值获取
    // 计算增量（对于第一个采样点：无增量计算）
    // 统计每次三个轴上的增量，得到一个三个轴总增量
    // 将每次统计的增量进行累加
    // 当累加的值大于200——玩家在摇晃手机——生产一注彩票（随机）

    long lastTime = 0;
    float lastX = 0;// 记录上一个点x轴的加速度值
    float lastY = 0;// 记录上一个点y轴的加速度值
    float lastZ = 0;// 记录上一个点z轴的加速度值

    float shake = 0;// 相对于上一个点增量
    float totalShake = 0;// 每次增量汇总

    float switchValue = 200;// 判断手机是否摇晃的阈值

    Vibrator vibrator;// 震动处理

    Context context;

    public ShakeSensor(Context context) {
        super();
        this.context = context;
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        long currentTime = System.currentTimeMillis();
        if (currentTime - lastTime > 100) {
            // 获取到三个轴的加速度值
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];
//            float x = event.values[SensorManager.DATA_X];
//            float y = event.values[SensorManager.DATA_Y];
//            float z = event.values[SensorManager.DATA_Z];
            // 当手机静止不动，会有微小的变动，当用户进入到双色球选号界面，过一个时间段自己选号
            // 是否可以计算增量
            if (lastTime == 0) {
                // 当第一个采样点，不需要计算
                lastX = x;
                lastY = y;
                lastZ = z;
                lastTime = currentTime;
            } else {
                // 第二个以后
                // 获取到相对于上一个点的增量,累积
                float ix = Math.abs(x - lastX);
                float iy = Math.abs(y - lastY);
                float iz = Math.abs(z - lastZ);
                //即使不摇晃的时候手机的传感器数值也会有细微的改变，我们不能让用户在买彩票的页面过一会就自动选彩票了，必须处理
                //就是让微小的变动都变成0
                if (ix < 1) {
                    ix = 0;
                }
                if (iy < 1) {
                    iy = 0;
                }
                if (iz < 1) {
                    iz = 0;
                }

                shake = ix + iy + iz;// 如果手机静止不动，单次统计为零
                //当判断用户没有摇动手机，所有值恢复初始状态
                if (shake == 0) {
                    init();
                }

                totalShake += shake;

                if (totalShake > switchValue) {
                    // 生产一注：双色球选号界面：机选双色球
                    // 在福彩3D机选
                    createLottery();
                    // 告知用户：震动
                    vibrator();
                    // 回复到初始状态
                    init();
                } else {
                    lastX = x;
                    lastY = y;
                    lastZ = z;
                    lastTime = currentTime;
                }

            }
        }
    }

    private void init() {
        lastTime = 0;
        lastX = 0;// 记录上一个点x轴的加速度值
        lastY = 0;// 记录上一个点y轴的加速度值
        lastZ = 0;// 记录上一个点z轴的加速度值

        shake = 0;// 相对于上一个点增量
        totalShake = 0;// 每次增量汇总
    }

    private void vibrator() {
        vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
        vibrator.vibrate(100);
    }

    /**
     * 生成一注彩票
     */
    public abstract void createLottery();
}
