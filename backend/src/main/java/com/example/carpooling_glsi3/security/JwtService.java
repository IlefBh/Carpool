package com.example.carpooling_glsi3.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "0VZ7ZNPFOwPNOsIYKgCsLxukwe2VfalDCnVCEqjWlX/8KB/GmspgAuhC70Gc5kkubEdP6AyodOtteeJvggZXvQfOaOfsA9Xt8Zk67oVtedSlR0QS7HVW0QG+tkerqJWykSOWKviY6hHMex25Aca3qzU/e18wVOU0omgux4Z2hS3yfKrZj8a/nWZXNoLQl4hVWD4p9HBHKj2SYMObTkfSyyVT0Rkj0CjGUwxFzrJdZhHhcSgD3UTidXMBVHirLIDS0o1KABD9uVSCxpWzV7UlME9FwEf3wPW5hKkW5PMt3brXl1F7ThmwosjNzrpITvR8vnpJ9r40HY6mu25mKhyhZjsFwdRwIPczJOZOSQiOhCQ=\n";



    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails);
    }


    public String generateToken(
            Map<String,Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
                .signWith(getSignInKey(),SignatureAlgorithm.HS512)
                .compact();

    }




    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String jwt) {
        return extractClaim(jwt, Claims::getSubject) ;
    }

    public Date extractExpiration(String jwt) {
        return extractClaim(jwt,Claims::getExpiration);
    }


}

