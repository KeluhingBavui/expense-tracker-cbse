package com.cbse.expensetracker.interceptor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
                String bearer = request.getHeader("Authorization").replace("Bearer ", "");
                if(bearer.isBlank() || bearer.isEmpty())
                    throw new ErrorResponseException(HttpStatus.FORBIDDEN);
        return true;
    }
}
