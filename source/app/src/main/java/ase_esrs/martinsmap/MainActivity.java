package ase_esrs.martinsmap;

import android.Manifest;
import android.app.FragmentManager;
import android.app.Fragment;
import android.app.FragmentTransaction;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback {

    GoogleMap googleMap;
    double latitude;
    double longitude;
    MapFragment mapsFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        try {
            mapsFragment = new MapFragment();
            FragmentManager fragmentManager = MainActivity.this.getFragmentManager();
            FragmentTransaction transaction = fragmentManager.beginTransaction();
            transaction.add(R.id.linear_layout, mapsFragment);
            transaction.commit();

            if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                latitude = 51.508530;
                longitude = -0.076132;
                Toast.makeText(this, "No location provided so showing London, UK", Toast.LENGTH_LONG).show();
            } else {
                latitude = 0;
                longitude = 0;
                LocationManager lm = (LocationManager) MainActivity.this.getSystemService(Context.LOCATION_SERVICE);
                lm.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 2000, 50, new LocationListener() {
                    @Override
                    public void onLocationChanged(Location location) {
                        latitude = location.getLatitude();
                        longitude = location.getLongitude();
                        updateMap();
                    }

                    @Override
                    public void onStatusChanged(String provider, int status, Bundle extras) {

                    }

                    @Override
                    public void onProviderEnabled(String provider) {

                    }

                    @Override
                    public void onProviderDisabled(String provider) {

                    }
                });
            }
        } catch(RuntimeException re) {
            Log.e("Martins Map", re.getMessage());
        } catch(Exception e) {
            Log.e("Martins Map", e.getMessage());
        }
    }

    void updateMap() {
        if(googleMap == null) {
            mapsFragment.getMapAsync(this);
        } else {
            if(latitude != 0 && longitude != 0){
                googleMap.clear();
                LatLng loc = new LatLng(latitude, longitude);
                Toast.makeText(this, "Updating location", Toast.LENGTH_SHORT).show();
                googleMap.addMarker(new MarkerOptions().position(loc).title("Your Location"));
                CameraUpdate move = CameraUpdateFactory.newLatLng(loc);
                CameraUpdate zoom = CameraUpdateFactory.zoomTo(15);
                googleMap.moveCamera(move);
                googleMap.animateCamera(zoom);
            }
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        this.googleMap = googleMap;
        updateMap();
    }
}
