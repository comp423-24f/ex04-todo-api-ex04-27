"""Enum for the state of an office hours ticket."""

from enum import Enum

__authors__ = ["Madelyn Andrews", "Sadie Amato", "Bailey DeSouza", "Meghan Sun"]
__copyright__ = "Copyright 2024"
__license__ = "MIT"


class TicketState(Enum):
    """
    Determines the state of a ticket.
    """

    QUEUED = 0
    CALLED = 1
    CLOSED = 2
    CANCELED = 3

    @classmethod
    def from_string(cls, str: str):
        if str == "Queued":
            return TicketState.QUEUED
        if str == "Called":
            return TicketState.CALLED
        if str == "Closed":
            return TicketState.CLOSED
        if str == "Cancelled":
            return TicketState.CANCELED

    def to_string(self) -> str:
        if self == TicketState.QUEUED:
            return "Queued"
        if self == TicketState.CALLED:
            return "Called"
        if self == TicketState.CLOSED:
            return "Closed"
        if self == TicketState.CANCELED:
            return "Cancelled"
