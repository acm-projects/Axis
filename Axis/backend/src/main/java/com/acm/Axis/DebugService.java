package com.acm.Axis;

import org.springframework.stereotype.Service;

@Service
public class DebugService {
    public DebugService() {
        System.out.println("PINATA_API_KEY (System.getenv): " + System.getenv("PINATA_API_KEY"));
        System.out.println("PINATA_SECRET_KEY (System.getenv): " + System.getenv("PINATA_SECRET_KEY"));
        System.out.println("ANTHROPIC (System.getenv): " + System.getenv("ANTHROPIC_API_KEY"));
        System.out.println("PINATA JTW (System.getenv): " + System.getenv("PINATA_JWT"));

    }
}
