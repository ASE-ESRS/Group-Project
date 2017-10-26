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
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;
import android.provider.Settings.Secure;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback {

    private GoogleMap googleMap;
    private double latitude;
    private double longitude;
    private MapFragment mapsFragment;
    private RequestQueue queue;
    private LocationListener locListener;
    private final static int LOCATION_PERMISSION = 1;
    private final static int INTERNET_PERMISSION = 2;
    private final static String SERVER_URI = "https://kvtlsm9uye.execute-api.eu-west-2.amazonaws.com/prod/HandleLocationUpdate";
    private String userId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mapsFragment = new MapFragment();
        FragmentManager fragmentManager = MainActivity.this.getFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.add(R.id.linear_layout, mapsFragment);
        transaction.commit();

        userId = Secure.getString(getContentResolver(), Secure.ANDROID_ID);
        queue = Volley.newRequestQueue(this);

        locListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                latitude = location.getLatitude();
                longitude = location.getLongitude();
                updateServer();
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
        };

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},
                    LOCATION_PERMISSION);
        } else {
            latitude = 0;
            longitude = 0;
            LocationManager lm = (LocationManager) MainActivity.this.getSystemService(Context.LOCATION_SERVICE);
            lm.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 2000, 50, locListener);
        }
    }

    /**
     * If the Google Map Fragment does not yet exist, request one. Otherwise,
     * clear the map and put a marker at the user's location.
     */
    private void updateMap() {
        if (googleMap == null) {
            mapsFragment.getMapAsync(this);
        } else {
            if (latitude != 0 && longitude != 0) {
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

    private void updateServer() {
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.INTERNET},
                    INTERNET_PERMISSION);
        } else {
            String requestUrl = SERVER_URI+"?latitude="+latitude+"&longitude="+longitude+"&userId="+userId;
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, requestUrl, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    try{
                        Log.d("Martins Map", (String) response.get("message"));
                        if(((String) response.get("status")).equals("success")) {
                            Toast.makeText(MainActivity.this, "Location successfully sent to server.", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(MainActivity.this, "Location could not be sent to the server.", Toast.LENGTH_SHORT).show();
                        }
                    } catch(JSONException ex) {
                        Toast.makeText(MainActivity.this, "Location could not be sent to the server.", Toast.LENGTH_SHORT).show();
                        Log.e("Martins Map", ex.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("Martins Map", error.getMessage());
                    Toast.makeText(MainActivity.this, "Location could not be sent to the server.", Toast.LENGTH_SHORT).show();
                }
            });

            queue.add(jsonObjectRequest);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case LOCATION_PERMISSION:
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    latitude = 0;
                    longitude = 0;
                    LocationManager lm = (LocationManager) MainActivity.this.getSystemService(Context.LOCATION_SERVICE);
                    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                            && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                        lm.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 2000, 50, locListener);
                    } else {
                        Toast.makeText(this, "No location provided", Toast.LENGTH_LONG).show();
                    }
                } else {
                    Toast.makeText(this, "No location provided", Toast.LENGTH_LONG).show();
                }
                break;
            case INTERNET_PERMISSION:
                if(grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    updateServer();
                }
                break;
            default:
                break;
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        this.googleMap = googleMap;
        updateMap();
    }
}
