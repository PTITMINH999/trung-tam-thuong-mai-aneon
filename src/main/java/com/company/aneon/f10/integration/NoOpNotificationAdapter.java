
package com.company.aneon.f10.integration;

import java.util.UUID;
import org.springframework.stereotype.Component;

/**
 * No-op notification adapter for demo deployment.
 * Notification delivery will be integrated with F15 later.
 */
@Component
public class NoOpNotificationAdapter implements NotificationPort {

    @Override
    public void notifyEventApproval(UUID eventId, String decision, UUID recipientId) {
        // Intentionally left blank: notification provider is not integrated yet.
    }
}
